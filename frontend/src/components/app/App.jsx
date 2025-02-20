import { Provider } from "react-redux";
import { createPortal } from "react-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import store from "../store/store";
import { Header } from "../header/Header";
import { Table } from "../table/Table";
import { BtnAdd } from "../btns/BtnAdd";
import { ModalAdd } from "../modals/modalAdd";

import "./App.css";

export function App() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <Provider store={store}>
      <div className="container">
        <Header />
        <Table />
        {!showAddModal && <BtnAdd open={() => setShowAddModal(true)} />}
        {showAddModal &&
          createPortal(
            <ModalAdd onClose={() => setShowAddModal(false)} />,
            document.body
          )}
      </div>
    </Provider>
  );
}

export default App;
