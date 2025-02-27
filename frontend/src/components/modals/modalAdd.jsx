import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { customAlphabet } from "nanoid";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { clientCreate } from "../slice/ClientSlice";
import { ContactsInput } from "./contactsInput";
import { BtnAddInput } from "./btnAddInput";

import closeSVG from "../../assets/img/close.svg";
import "./modal.css";

// Устанавливаю индификатор через библиотеку nanoid
const nanoid = customAlphabet("0123456789", 13);

const initialValues = {
  name: "",
  surname: "",
  lastName: "",
  contacts: [],
  id: nanoid(),
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
};

const validation = Yup.object({
  name: Yup.string().min(2, "Введи имя").required("Заполни"),
  surname: Yup.string().min(2, "Введи фамилию").required("Заполни"),
  lastName: Yup.string().min(2, "Введи отчество").required("Заполни"),
});

export const ModalAdd = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleSave = (handleSubmit, onClose) => {
    handleSubmit();
    onClose();
  };

  return (
    <div className="modal__newClient" id="newClientModal" onClick={onClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        // enableReinitialize={true} // это делается для того, чтобы обновлялся initialValues Fromik по состоянию contact и ещё есть способ ч/з setFieldValue
        // Если contact обновляется асинхронно – используй enableReinitialize={true}.
        // Если хочешь управлять значением вручную – используй setFieldValue("contacts", [...]).
        onSubmit={(values) => dispatch(clientCreate({ data: values }))}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="modal__form">
              <Form className="form" id="newClientForm">
                <h2 className="modal__subtitle">Новый клиент</h2>
                <div className="text-field">
                  <Field
                    type="text"
                    className="form-control form_input"
                    id="user__surname"
                    name="surname"
                    required
                  />
                  <label htmlFor="" className="input-label">
                    Фамилия
                    <span className="input-title">*</span>
                  </label>
                  <ErrorMessage name="surname" component="div" />
                </div>
                <div className="text-field">
                  <Field
                    type="text"
                    className="form-control form_input"
                    id="user_name"
                    name="name"
                    required
                  />
                  <label htmlFor="" className="input-label">
                    Имя
                    <span className="input-title">*</span>
                  </label>
                  <ErrorMessage name="name" component="div" />
                </div>
                <div className="text-field">
                  <Field
                    type="text"
                    className="form-control form_input"
                    id="user_lastname"
                    name="lastName"
                    required
                  />
                  <label htmlFor="" className="input-label">
                    Отчество
                    <span className="input-title">*</span>
                  </label>
                  <ErrorMessage name="lastName" component="div" />
                </div>
              </Form>
            </div>
            <div className="modal__btn">
              {/* FieldArray используется для управления массивом contacts в Formik. Он позволяет динамически добавлять и удалять элементы формы. */}
              <FieldArray
                // name="contacts" → Связывает FieldArray с values.contacts в Formik.
                name="contacts"
                // arrayHelpers → Это объект с методами push, remove, replace и т.д.
                render={(arrayHelpers) => (
                  <div>
                    {/* values.contacts → Массив контактов в Formik.*/}
                    {values.contacts.map((contact, i) => (
                      // contact.id || i - Если у контакта есть id, он используется как key. Если id нет (например, у нового контакта), используется индекс массива (i).
                      <div key={contact.id || i}>
                        <ContactsInput
                          handelAddContacts={(data) => {
                            //data → новые данные для контакта.
                            const updatedContacts = values.contacts.map(
                              (
                                item //Используем map(), чтобы найти контакт с contact.id и обновить его.
                              ) =>
                                item.id === contact.id
                                  ? { ...item, ...data }
                                  : item //это для обновления нужного объекта в массиве contacts.
                            );
                            setFieldValue("contacts", updatedContacts); //setFieldValue — это метод из Formik, который изменяет значение указанного поля.
                          }}
                          handelDeleteComponent={() =>
                            setFieldValue(
                              "contacts",
                              values.contacts.filter(
                                (item) => item.id !== contact.id
                              )
                            )
                          }
                          contacts={contact}
                        />
                      </div>
                    ))}

                    <BtnAddInput
                      handelComponent={() =>
                        arrayHelpers.push({
                          id: nanoid(),
                          type: "phone",
                          value: "",
                        })
                      }
                      style={
                        values.contacts.length > 0
                          ? { padding: "15px 0px" }
                          : { padding: "0px 0px" }
                      }
                    />
                  </div>
                )}
              />
            </div>
            <button
              className="modal__content_btn-create"
              id="saveBtn"
              type="submit"
              onClick={() => handleSave(handleSubmit, onClose)}
            >
              Сохранить
            </button>
            <button
              className="btn-reset modal__content_close"
              id="cancelBtn"
              onClick={onClose}
            >
              Отмена
            </button>
            <div className="modal__close">
              <button className="btn-reset btn-closed" onClick={onClose}>
                <img src={closeSVG} alt="close" />
              </button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
