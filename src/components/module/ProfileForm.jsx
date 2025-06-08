import { Button } from "@mui/material";
import { CgProfile } from "react-icons/cg";

const ProfileForm = (props) => {
  const { name, lastName, password, changeHandler } = props;
  return (
    <section className="flex flex-col">
      <div className="flex items-center">
        <CgProfile className="mr-2" />
        <h2>Profile</h2>
      </div>
      <form className="form-profile">
        <label htmlFor="name">name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={changeHandler}
        />
        <label htmlFor="lastName">lastName:</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={lastName}
          onChange={changeHandler}
        />
        <label htmlFor="password">password: </label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={changeHandler}
        />
        <Button variant="contained">save</Button>
      </form>
    </section>
  );
};

export default ProfileForm;
