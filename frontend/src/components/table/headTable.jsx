import { setSurnameSort } from "../slice/ClientSlice";
import { useDispatch, useSelector } from "react-redux";

export const HeadTable = () => {
  const dispatch = useDispatch();
  const surnameSortFlag = useSelector((state) => state.client.surnameSortFlag);
  let array = [
    {
      oneClass: "col block__id",
      twoClass: "btn-reset btn__th btn__th_id",
      textContent: "ID",
      dataAttribute: "id",
      id: 1,
    },
    {
      oneClass: "col block__fio",
      twoClass: "btn-reset btn__th btn__th_fio",
      textContent: "Фамилия Имя Отчество",
      dataAttribute: "fio",
      id: 2,
    },
    {
      oneClass: "col block__data",
      twoClass: "btn-reset btn__th btn__th_data",
      textContent: `Дата и время \n\ создания`,
      dataAttribute: "date",
      id: 3,
    },
    {
      oneClass: "col block__clear",
      twoClass: "btn-reset btn__th btn__th_clear",
      textContent: `Последние \n\ изменения`,
      dataAttribute: "change",
      id: 4,
    },
  ];

  const handleSortClient = (e) => {
    if (e.target.getAttribute("data-head") === "fio") {
      dispatch(setSurnameSort());
    }
  };

  const th = array.map(
    ({ oneClass, twoClass, textContent, dataAttribute, id }) => {
      return (
        <th className={oneClass} key={id}>
          <button
            className={twoClass}
            style={{ whiteSpace: "pre-line" }}
            onClick={handleSortClient}
            data-head={dataAttribute}
          >
            {textContent}
            {dataAttribute === "fio" ? (
              <svg
                className={!surnameSortFlag ? "btn__th_svg" : "btn__active"}
                // className="btn__th_svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="arrow_downward" clipPath="url(#clip0_211_4865)">
                  <path
                    id="Vector"
                    d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z"
                    fill="#9873FF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_211_4865">
                    <rect
                      width="12"
                      height="12"
                      fill="white"
                      transform="translate(12 12) rotate(-180)"
                    />
                  </clipPath>
                </defs>
              </svg>
            ) : null}
          </button>
        </th>
      );
    }
  );

  return <>{th}</>;
};
