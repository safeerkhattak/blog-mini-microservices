// import React, { useState } from "react";
// import axios from "axios";

// const PostCreate = () => {
//   const [title, setTitle] = useState("");

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     console.log("calling api",title)
//     await axios.post("http://localhost:4000/posts", {
//       title,
//     });

//     setTitle("");
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <div className="form-group">
//           <label>Title</label>
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="form-control"
//           />
//         </div>
//         <button className="btn btn-primary">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default PostCreate;


import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
console.log("first,title",title)
    try {
      await axios.post("http://localhost:4000/posts", { title });
      setTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;