import { ProfileApi } from "@/helper/profileUpdateApi";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";

const ProfileForm = (props) => {
  const { name, lastName, password, form, changeHandler } = props;
  const router = useRouter();

  const sendHandler = async (e) => {
    e.preventDefault();
    if (!name || !lastName || !password) {
      toast.error("field shouldn't be empty 😁", { duration: 2000 });
      return;
    }
    const state = await ProfileApi(form);
    if (state) {
      toast.success("updated!", { duration: 2000 });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.reload();
    } else {
      toast.error("failed to update 🙁", { duration: 2000 });
    }
  };

  return (
    <section className="flex flex-col">
      <div className="flex items-center">
        <CgProfile className="mr-2" />
        <h2>Profile</h2>
      </div>
      <form onSubmit={sendHandler} className="form-profile">
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

        <Button type="submit" variant="contained">
          save
        </Button>
      </form>
    </section>
  );
};

export default ProfileForm;
