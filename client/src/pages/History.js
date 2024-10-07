import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { getMe } from '../utils/API';
import Auth from "../utils/auth";
import { formatDate } from '../utils/dateFormat';
import Header from "../components/Header";
import cardioIcon from "../assets/images/cardio.png";
import resistanceIcon from "../assets/images/resistance.png";

export default function History() {
  const [userData, setUserData] = useState({});
  const [exerciseData, setExerciseData] = useState([]);
  const [userFormsDataData, setuserFormsDataData] = useState([]); // State to store userFormsData data
  const [displayedItems, setDisplayedItems] = useState(6);

  const loggedIn = Auth.loggedIn();
  let currentDate;

  // Fetch user data including exercise and userFormsData data
  useEffect(() => {
    const getUserData = async () => {
      try {
				   
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const user = await response.json();
        console.log('User Data:', user);

        // Combine cardio and resistance data
        if (user.cardio && user.resistance) {
          const cardio = user.cardio;
          const resistance = user.resistance;
          const exercise = cardio.concat(resistance);

          // Sort exercise data by date
          exercise.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });

          // Format date in exercise data
          exercise.forEach(item => {
            item.date = formatDate(item.date);
          });

          setUserData(user);
          setExerciseData(exercise);
        }

        // Set userFormsData data
        if (user.userforms) {
          console.log('User Forms Data:', user.userforms);
          setuserFormsDataData(user.userforms); // Assuming `userFormsData` exists in the user object
        }

      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [loggedIn]);

  function showMoreItems() {
    setDisplayedItems(displayedItems + 6);
  }


  // If the user is not logged in, redirect to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='history'>
      <Header />
      <div className="d-flex flex-column align-items-center">
        <h2 className='title'>History</h2>

        {/* Display userFormsData data */}
        {userFormsDataData.length ? (
          <div className='user-forms-data'>
            <h3 className='user-forms-title'>User Forms Data</h3>
            {userFormsDataData.map((form, index) => (
              <div key={index} className='user-form'>
              <p><strong>Name:</strong> {form.name}</p>
              <p><strong>Age:</strong> {form.age}</p>
              <p><strong>Weight:</strong> {form.weight} lbs</p>
              <p><strong>Height:</strong> {form.height} inches</p>
              <p><strong>Activity Level:</strong> {form.activityLevel}</p>
              <p><strong>Fitness Goals:</strong> {form.fitnessGoals}</p>
              <p><strong>Current Health Status:</strong> {form.currentHealthStatus}</p>
              <p><strong>Medical History:</strong> {form.medicalHistory}</p>
              <p><strong>Current Conditions:</strong> {form.currentConditions}</p>
              <p><strong>Fractures:</strong> {form.fractures}</p>
              <p><strong>Daily Food Intake (Morning):</strong> {form.dailyFoodIntake_morning}</p>
              <p><strong>Daily Food Intake (Afternoon):</strong> {form.dailyFoodIntake_afternoon}</p>
              <p><strong>Daily Food Intake (Evening):</strong> {form.dailyFoodIntake_evening}</p>
              <p><strong>Daily Food Intake (Dinner):</strong> {form.dailyFoodIntake_dinner}</p>
              <p><strong>Exercise Level:</strong> {form.exerciseLevel}</p>
              <p><strong>Workout Preference:</strong> {form.workoutPreference}</p>
              <p><strong>Date:</strong> {form.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <h3>No User Forms data yet...</h3>
        )}

        {/* Display Exercise Data */}
        {exerciseData.length ? (
          <div className='history-data'>
            {exerciseData.slice(0, displayedItems).map((exercise) => {
              let dateToDisplay;
              if (exercise.date !== currentDate) {
                currentDate = exercise.date;
                dateToDisplay = exercise.date;
              }
              return (
                <div className='history-div d-flex' key={exercise._id}>
                  <div className='date d-flex align-items-center'>{dateToDisplay}</div>
                  <Link className='text-decoration-none' to={`/history/${exercise.type}/${exercise._id}`}>
                    {exercise.type === "cardio" ? (
                      <div className="history-card cardio-title d-flex">
                        <div className='d-flex align-items-center'><img alt="cardio" src={cardioIcon} className="history-icon" /></div>
                        <div>
                          <p className='history-name'>{exercise.name}</p>
                          <p className='history-index'>{exercise.distance} miles</p>
                        </div>
                      </div>
                    ) : (
                      <div className="history-card resistance-title d-flex">
                        <div className='d-flex align-items-center'><img alt="resistance" src={resistanceIcon} className="history-icon" /></div>
                        <div>
                          <p className='history-name'>{exercise.name}</p>
                          <p className='history-index'>{exercise.weight} pounds</p>
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              );
            })}
            {/* Show more items */}
            {exerciseData.length > displayedItems ? (
              <div className='d-flex justify-content-center'>
                <button className='show-btn' onClick={showMoreItems}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                  Show More
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <h3 className='history-text'>No exercise data yet...</h3>
            <Link to="/exercise"><button className='home-btn'>Add Exercise</button></Link>
          </div>
        )}
      </div>
    </div>
  );
}
