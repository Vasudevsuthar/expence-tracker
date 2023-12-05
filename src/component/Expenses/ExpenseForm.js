import React, { useContext, useState } from "react";
import { Table, Button, Dropdown } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import './Style.css';

const ExpenseTracker = () => {
  const authCtx = useContext(AuthContext);

  const [expenseData, setExpenseData] = useState({
    amount: "",
    description: "",
    category: "",
  });

  const [expenses, setExpenses] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategorySelect = (category) => {
    setExpenseData((prevData) => ({
      ...prevData,
      category,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Math.random().toString(),
      amount: expenseData.amount,
      description: expenseData.description,
      category: expenseData.category,
    };

    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);

    setExpenseData({
      amount: "",
      description: "",
      category: "",
    });
  };

  return (
    <div className="Container">
      {authCtx.isLoggedIn && (
        <div className="itemContainer">
          <h2>Expense Tracker</h2>
          <table className="Table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Enter amount"
                    name="amount"
                    value={expenseData.amount}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter description"
                    name="description"
                    value={expenseData.description}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <Dropdown onSelect={handleCategorySelect}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {expenseData.category || "Select Category"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Food">Food</Dropdown.Item>
                      <Dropdown.Item eventKey="Petrol">Petrol</Dropdown.Item>
                      <Dropdown.Item eventKey="Salary">Salary</Dropdown.Item>
                      <Dropdown.Item eventKey="Shopping">
                        Shopping
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleFormSubmit}
                  >
                    Add Expense
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <div>
              <h3>Expenses</h3>
              <ul>
                {expenses.map((expense) => (
                  <li key={expense.id}>
                    {`Amount: ${expense.amount}, Description: ${expense.description}, Category: ${expense.category}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;
