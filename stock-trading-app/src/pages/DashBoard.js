import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")));
  const [stocksDisplayData, setStocksDisplayData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getStocksData = () => {
    axios
      .get(`http://localhost:5000/api/v1/stocks/${user?.id}?pageSize=10`, {
        headers: {
          "Content-Type": "application/json",
        },
        retry: {
          retries: 3,
          retryDelay: (retryCount) => retryCount * 1000,
          retryCondition: (error) => {
            return axios.isRetryableError(error) || error.response.status >= 500;
          },
        },
      })
      .then((response) => {
        console.log(response.data);
        setStocksDisplayData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      getStocksData();
    }
  }, [user]);

  const handleLike = (stockId) => {
    axios
      .post(
        `http://localhost:5000/api/v1/stocks/${user?.id}/like/${stockId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        getStocksData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(stocksDisplayData);

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    navigate("/login");
  };

  return (
    <div style={{ margin: "30px" }}>
      <h1>Stocks Dashboard</h1>
      {/* <>{stocksData && <>{stocksDisplayData}</>}</> */}
      {/* {stocksDisplayData.map((stock, index) => {
            return (
                <div key={index} style={{display:"flex", flexDirection:"row"}}>
                    <p style={{margin:"10px"}}>{stock?.ticker}</p>
                    <p style={{margin:"10px"}}>{stock?.name}</p>
                    <p style={{margin:"10px"}}>{stock?.noOfLikes}</p>
                </div>
            )
        })}  */}
      {!isLoading ? (
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
              <th>Likes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stocksDisplayData.map((stock, index) => {
              return (
                <tr key={index}>
                  <td>{stock?.ticker}</td>
                  <td>
                    <div className="stock-name-wrapper">
                      <span className="stock-name">{stock?.name}</span>
                      <span className="tooltip-text">{stock?.name}</span>
                    </div>
                  </td>
                  <td>{stock?.noOfLikes}</td>
                  <td>
                    <button className="like-button" onClick={() => handleLike(stock?.ticker)}>
                      Like/Unlike
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>Loading...</div>
      )}
      <p onClick={() => logout()} style={{ marginTop: "50px", textDecoration: "underline", cursor: "pointer" }}>
        Logout
      </p>
    </div>
  );
};
export default Dashboard;
