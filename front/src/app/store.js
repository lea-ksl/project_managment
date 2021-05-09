import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from "../features/projects/projectsSlice";
import projectReducer from "../features/projects/projectSlice";
import tasksReducer from "../features/tasks/tasksSlice";
import usersReducer from "../features/users/usersSlice";
import  userSlice  from '../features/users/userSlice';

export default configureStore({
  reducer: {
    projects: projectsReducer,
    project: projectReducer,
    tasks:tasksReducer,
    users: usersReducer,
    user: userSlice,
  },
});
