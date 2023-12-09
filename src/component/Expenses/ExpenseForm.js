import React, { useContext, useState, useEffect, useCallback } from "react";
import { Table, Button, Dropdown } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../store/expenseSlice";
import { toggleDarkMode } from "../store/themeSlice";
import { CSVLink } from "react-csv";
import { IoMdCloudDownload } from "react-icons/io";


const ExpenseTracker = () => {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const [expenses, setExpenses] = useState([]);
  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [premium, setPremium] = useState(false);
  const [premiumActive, setPremiumActive] = useState(
    localStorage.getItem("premiumActivated")
  );

  const [csvData, setCsv] = useState("No Data");
  const userEmail = localStorage.getItem("email");
  const cleanedEmail = userEmail.replace(/[@.]/g, "");
  const [isEdit, setEdit] = useState(false);

  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isEdit === true) {
      const newExpense = {
        amount: moneySpent,
        description: description,
        category: selectedCategory,
      };
      dispatch(expenseAction.addAmount(moneySpent));
      dispatch(expenseAction.addDesc(description));
      dispatch(expenseAction.addCategory(selectedCategory));
      const id = localStorage.getItem("id");
      fetch(
        `https://expensetracker-dc96e-default-rtdb.firebaseio.com/userExpenses/${cleanedEmail}/${id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(newExpense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          setEdit(false);
          console.log(response);
          fetchExpenses();
        })
        .catch((err) => {
          alert("Not able to edit successfully - " + err);
        });
      setMoneySpent("");
      setDescription("");
      setSelectedCategory("");
    } else {
      const newExpense = {
        amount: moneySpent,
        description: description,
        category: selectedCategory,
      };
      dispatch(expenseAction.addAmount(moneySpent));
      dispatch(expenseAction.addDesc(description));
      dispatch(expenseAction.addCategory(selectedCategory));

      fetch(
        `https://expensetracker-dc96e-default-rtdb.firebaseio.com/userExpenses/${cleanedEmail}.json`,
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
          alert("Expense added successfully!");
          const expenseDataWithId = { ...newExpense, id: data.name };
          setExpenses((prevExpenses) => [...prevExpenses, expenseDataWithId]);
          fetchExpenses();
        })
        .catch((error) => {
          console.error("Error adding expense:", error);
          alert("Error adding expense");
        });

      setMoneySpent("");
      setDescription("");
      setSelectedCategory("");
    }
  };

  const fetchExpenses = useCallback(() => {
    fetch(
      `https://expensetracker-dc96e-default-rtdb.firebaseio.com/userExpenses/${cleanedEmail}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            let arr = [];
            for (let key in data) {
              arr.push({
                id: key,
                description: data[key].description,
                amount: data[key].amount,
                category: data[key].category,
              });
            }
            setCsv(arr);
            setExpenses(arr);
            localStorage.setItem("allExpense", JSON.stringify(arr));
            dispatch(expenseAction.addExpenses(expenses));
          });
        } else {
          response.json().then((data) => {
            let errorMessage = "Add Expense Failed!!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, cleanedEmail, expenses]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const deleteExpenseHandler = (id) => {
    fetch(
      `https://expensetracker-dc96e-default-rtdb.firebaseio.com/userExpenses/${cleanedEmail}/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong!");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Expense deleted successfully!", data);
        alert("Expnse deleted successfully!");
        fetchExpenses();
      })
      .catch((error) => {
        console.error("Errpr deleting expense:", error);
        alert("Error deleting expense");
      });
  };

  const editeExpenseHandler = (id) => {
    let editExpense = expenses.filter((expense) => {
      return expense.id === id;
    });
    setEdit(true);
    setMoneySpent(editExpense[0].amount);
    setDescription(editExpense[0].description);
    setSelectedCategory(editExpense[0].category);
    console.log(editExpense);
    localStorage.setItem("id", id);
  };

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
      total += +expenses[i].amount;
    }
    if (total >= 10000 && premiumActive === null) {
      setPremium(true);
    } else {
      setPremium(false);
    }
  }, [expenses, premiumActive]);
  
  const activatePremiumHandler = () => {
    if (premium === true) {
      setPremiumActive(true);
      localStorage.setItem("premiumActivated", true);
      setPremium(false);
    } else {
      setPremiumActive(false);
      localStorage.removeItem("premiumActivated");
    }
  };

  let header = [
    {
      label: "Amount",
      key: "amount",
    },
    {
      label: "Description",
      key: "description",
    },
    {
      label: "Category",
      key: "category",
    },
  ];

  return (
    <div>
      <div style={{background: darkMode ? 'rgba(0, 0, 0, 0.600)' : 'white', color: darkMode ? 'white' : 'black' , height: '100vh'}}>
        {authCtx.isLoggedIn && (
          <div className="itemContainer">
            <div  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Expense Tracker</h2>
            {premiumActive && (
            <Button
            variant="secondary"
            style={{ padding: "5px", margin: "10px" }}
              onClick={() => dispatch(toggleDarkMode())}>
              Toggle Dark Mode
            </Button>
          )}
          </div>
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
                      value={moneySpent}
                      onChange={(e) => setMoneySpent(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </td>
                  <td>
                    <Dropdown
                      onSelect={(selectedCategory) =>
                        setSelectedCategory(selectedCategory)
                      }
                    >
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {selectedCategory || "Select Category"}
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
                  {Array.isArray(expenses) &&
                    expenses.map((expense, index) => (
                      <li key={index} id={expense.id}>
                        {`Amount: ${expense.amount}, Description: ${expense.description}, Category: ${expense.category}`}
                        <Button
                          variant="danger"
                          style={{ marginLeft: "10px" }}
                          onClick={() => deleteExpenseHandler(expense.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="success"
                          style={{ marginLeft: "10px", margin: "3px" }}
                          onClick={() => editeExpenseHandler(expense.id)}
                        >
                          Edit
                        </Button>
                      </li>
                    ))}
                </ul>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {premium && (
                  <Button
                    variant="success"
                    style={{
                      marginLeft: "10px",
                      margin: "3px",
                      backgroundColor: "violet",
                    }}
                    onClick={activatePremiumHandler}
                  >
                    Activate Premium
                  </Button>
                )}
                {premiumActive && (
            <Button  style={{
              marginLeft: "10px",
              margin: "3px",
              backgroundColor: "grey",
              color: "black",
            }}>
              <CSVLink data={csvData} headers={header} filename="expenses.csv"  style={{ color: "white" }}>
              <IoMdCloudDownload style={{color: "white"}}/>
                Download Expense File
              </CSVLink>
            </Button>
          )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
