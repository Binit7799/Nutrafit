import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Auth from "../utils/auth";
import { createUser } from '../utils/API-old';
import {createUserForms} from '../utils/API'
import Header from "./Header";
import userIcon from "../assets/images/resistance-w.png"

export default function UserForms() {
    const [userForm, setUserForm] = useState({
        name: "",
        age: "",
        weight: "",
        height: "",
        activityLevel: "",
        fitnessGoals: "",
        currentHealthStatus: "",
        medicalHistory: "",
        currentConditions: "",
        fractures: "",
        dailyFoodIntake_morning: "",
        dailyFoodIntake_afternoon: "",
        dailyFoodIntake_evening: "",
        dailyFoodIntake_dinner: "",
        exerciseLevel: "",
        workoutPreference: "",
        date: ""
    })
    const [startDate, setStartDate] = useState(new Date());
    const [message, setMessage] = useState("");
    const loggedIn = Auth.loggedIn();

    const handleDateChange = date => {
        setStartDate(date);
        handleUserChange({
            target: { name: "date", value: date }
        })
    }

    const handleUserChange = (event) => {
        const { name, value } = event.target;
        setUserForm({ ...userForm, [name]: value })

    }

    const validateForm = (form) => {
        return form.name && form.age && form.weight && form.height && form.activityLevel && form.fitnessGoals && form.currentHealthStatus && form.medicalHistory && form.currentConditions && form.fractures && form.dailyFoodIntake_morning && form.dailyFoodIntake_afternoon && form.dailyFoodIntake_evening && form.dailyFoodIntake_dinner && form.exerciseLevel && form.workoutPreference && form.date;
    }

    const handleUserSubmit = async (event) => {
        event.preventDefault();

        //get token
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        // get user id 
        const userId = Auth.getUserId();

        // user submit
        if (validateForm(userForm)) {
            try {
                // add userid to user form
                userForm.userId = userId;

                const response = await createUserForms(userForm, token);

                if (!response.ok) {
                    throw new Error('something went wrong!');
                }

                setMessage("User successfully created!")
                setTimeout(() => {
                    setMessage("")
                }, 3000);

            } catch (err) {
                console.error(err)
            }
        }

        // clear form input
        setUserForm({
            name: "",
            age: "",
            weight: "",
            height: "",
            activityLevel: "",
            fitnessGoals: "",
            currentHealthStatus: "",
            medicalHistory: "",
            currentConditions: "",
            fractures: "",
            dailyFoodIntake_morning: "",
            dailyFoodIntake_afternoon: "",
            dailyFoodIntake_evening: "",
            dailyFoodIntake_dinner: "",
            exerciseLevel: "",
            workoutPreference: "",
            date: ""
        });
    }

    if (!loggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className='user'>
            <Header />
            <div className="d-flex flex-column align-items-center">
                <h2 className='title text-center'>User Profile</h2>
                <form className='user-form d-flex flex-column' onSubmit={handleUserSubmit}>
                    <div className='d-flex justify-content-center'><img alt="user" src={userIcon} className="user-form-icon" /></div>
                    <label>Name:</label>
                    <input type="text" name="name" id="name" placeholder="John Doe"
                        value={userForm.name} onChange={handleUserChange} />
                    <label>Age:</label>
                    <input type="number" name="age" id="age" placeholder="0"
                        value={userForm.age} onChange={handleUserChange} />
                    <label>Weight (lbs):</label>
                    <input type="number" name="weight" id="weight" placeholder="0"
                        value={userForm.weight} onChange={handleUserChange} />
                    <label>Height (inches):</label>
                    <input type="number" name="height" id="height" placeholder="0"
                        value={userForm.height} onChange={handleUserChange} />
                    <label>Activity Level:</label>
                    <input type="text" name="activityLevel" id="activityLevel" placeholder="Active"
                        value={userForm.activityLevel} onChange={handleUserChange} />
                    <label>Fitness Goals:</label>
                    <input type="text" name="fitnessGoals" id="fitnessGoals" placeholder="Lose Weight"
                        value={userForm.fitnessGoals} onChange={handleUserChange} />
                    <label>Current Health Status:</label>
                    <input type="text" name="currentHealthStatus" id="currentHealthStatus" placeholder="Good"
                        value={userForm.currentHealthStatus} onChange={handleUserChange} />
                    <label>Medical History:</label>
                    <input type="text" name="medicalHistory" id="medicalHistory" placeholder="None"
                        value={userForm.medicalHistory} onChange={handleUserChange} />
                    <label>Current Conditions:</label>
                    <input type="text" name="currentConditions" id="currentConditions" placeholder="None"
                        value={userForm.currentConditions} onChange={handleUserChange} />
                    <label>Fractures:</label>
                    <input type="text" name="fractures" id="fractures" placeholder="None"
                        value={userForm.fractures} onChange={handleUserChange} />
                    <label>Daily Food Intake (morning):</label>
                    <input type="text" name="dailyFoodIntake_morning" id="dailyFoodIntake_morning" placeholder="Eggs, Toast"
                        value={userForm.dailyFoodIntake_morning} onChange={handleUserChange} />
                    <label>Daily Food Intake (afternoon):</label>
                    <input type="text" name="dailyFoodIntake_afternoon" id="dailyFoodIntake_afternoon" placeholder="Salad, Chicken"
                        value={userForm.dailyFoodIntake_afternoon} onChange={handleUserChange} />
                    <label>Daily Food Intake (evening):</label>
                    <input type="text" name="dailyFoodIntake_evening" id="dailyFoodIntake_evening" placeholder="Pasta, Vegetables"
                        value={userForm.dailyFoodIntake_evening} onChange={handleUserChange} />
                    <label>Daily Food Intake (dinner):</label>
                    <input type="text" name="dailyFoodIntake_dinner" id="dailyFoodIntake_dinner" placeholder="Rice, Beans"
                        value={userForm.dailyFoodIntake_dinner} onChange={handleUserChange} />
                    <label>Exercise Level:</label>
                    <input type="text" name="exerciseLevel" id="exerciseLevel" placeholder="High"
                        value={userForm.exerciseLevel} onChange={handleUserChange} />
                    <label>Workout Preference:</label>
                    <input type="text" name="workoutPreference" id="workoutPreference" placeholder="Cardio"
                        value={userForm.workoutPreference} onChange={handleUserChange} />
                    <label >Date:</label>
                    <DatePicker selected={startDate} value={userForm.date} onChange={handleDateChange} placeholderText="mm/dd/yyyy" />
                    <button className='submit-btn' type="submit" disabled={!validateForm(userForm)} >Save</button>
                </form>
                <p className='message'>{message}</p>
            </div>
        </div>
    )
}


