import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { setClickAll } from "../redux/actions";
import { addMovie } from "../utils/movies";
import "../style.css";

function AddMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clickAll } = useSelector((state: any) => state);
  const [name, setName] = useState("");
  const [genres, setGenres] = useState("");
  const [image, setImage] = useState("");
  const [premiered, setPremiered] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "genres":
        setGenres(value);
        break;
      case "image":
        setImage(value);
        break;
      case "premiered":
        setPremiered(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check input data
    if (!name) {
      alert("Movie's name is required");
      return;
    }

    // Movies - DB
    const arrGenres = genres.split(",");
    const movie = { name, genres: arrGenres, image, premiered };
    const { data } = await addMovie(movie);
    if (typeof data === "string") {
      alert(data);
    } else {
      alert(data.message);
      return;
    }

    // Redirect to - Movies page
    dispatch(setClickAll(!clickAll));
    navigate("/main/movies");
  };

  const cancel = () => {
    dispatch(setClickAll(!clickAll));
    navigate("/main/movies");
  };

  return (
    <div>
      <Typography
        variant="h5"
        fontWeight={"bold"}
        fontSize={"1.1rem"}
        mt="15px"
        mb="15px"
      >
        Add New Movie
      </Typography>
      <form onSubmit={handleSubmit} className="Movie-Form">
        Name :
        <input type="text" name="name" value={name} onChange={handleChange} />
        Genres :
        <input
          type="text"
          name="genres"
          value={genres}
          onChange={handleChange}
        />
        Image URL :
        <input type="text" name="image" value={image} onChange={handleChange} />
        Premiered :
        <input
          type="date"
          name="premiered"
          value={premiered}
          onChange={handleChange}
          style={{ width: "110px" }}
        />
        &nbsp;
        <div style={{ gridColumn: "span 2" }}>
          <button type="submit">Save</button>{" "}
          <button type="button" onClick={cancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMovie;
