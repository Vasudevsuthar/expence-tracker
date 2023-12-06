import React, { useContext, useState, useEffect, useCallback } from "react";
import { Table, Button, Dropdown } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { useDispatch } from "react-redux";
import { expenseAction } from "../store/expenseSlice";
import "./Style.css";

const ExpenseTracker = () => {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const [expenseData, setExpenseData] = useState({
    amount: "",
    description: "",
    category: "",
  });

  const [expenses, setExpenses] = useState([]);
  const userEmail = localStorage.getItem("email");
  const cleanedEmail = userEmail.replace(/[@.]/g, "");

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
      amount: expenseData.amount,
      description: expenseData.description,
      category: expenseData.category,
    };

    fetch(
      `https://expensetracker-dc96e-default-rtdb.firebaseio.com/userExpenses${cleanedEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify(newExpense),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Expense added successfully!", data);
        alert("Expense added successfully!")
        const expenseDataWithId = { ...newExpense, id: data.name };
        setExpenses((prevExpenses) => [...prevExpenses, expenseDataWithId]);
        fetchExpenses();
      })
      .catch((error) => {
        console.error("Error adding expense:", error);
        alert("Error adding expense");
      });

    setExpenseData({
      amount: "",
      description: "",
      category: "",
    });
  };

  const fetchExpenses = useCallback(() => {
    fetch(
      `https://expensetracker-dc96e-default-rtdb.firebaseio.com/userExpenses${cleanedEmail}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Add Expense Failed!!");
        }
      })
      .then((data) => {
        let arr = [];
        for (let key in data) {
          arr.push({
            id: key,
            description: data[key].description,
            amount: data[key].amount,
            category: data[key].category,
          });
        }
        setExpenses(arr);
        localStorage.setItem("allExpense", JSON.stringify(arr));
        dispatch(expenseAction.addExpenses(arr));
      })
      .catch((err) => {
        console.error("Error fetching expenses:", err);
      });
  }, [cleanedEmail, dispatch]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <div className="Container">
      {authCtx.isLoggedIn && (
        <div className="itemContainer">
          <h2>Expense Tracker</h2>
          <Table striped bordered hover>
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
          </Table>
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
