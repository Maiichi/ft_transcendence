import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../core";
import {
  CounterState,
  decrement,
  increment,
  incrementByAmount,
} from "./components/CounterSlice";
import { TodosState } from "./components/TodosSlice";
import { fetchTodos } from "./components/TodosThunk";

// export const Test = () => {
//   const state: CounterState = useAppSelector((state) => state.counter);
//   // const todos: TodosState = useAppSelector((state) => state.todos);
//   const dispatch = useAppDispatch();
//   // useEffect(() => {
//   //   dispatch(fetchTodos(4));
//   // }, []);

//   console.log("test");

//   return (
//     <>
//       <p>{state.value}</p>
//       <button onClick={() => dispatch(increment())}>"+" </button>
//       <button onClick={() => dispatch(decrement())}>"-" </button>
//       <button onClick={() => dispatch(incrementByAmount(2))}>"=" </button>
//       <p>{state.nbr}</p>
//     </>
//   );
// };

export const Test = () => {
  const [img, setImg] = useState('');

  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  // const handleUpload = async (event: any) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     try {
  //       const formData = new FormData();
  //       formData.append('file', file);

  //       const response = await fetch(`/api/users/${user.intraId}/upload-avatar`, {
  //         method: 'POST',
  //         headers : {
  //           Authorization : `Bearer ${token}`
  //         },
  //         body: formData,
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setImg(data.avatar_url); // Assuming the server returns the URL of the uploaded image
  //       } else {
  //         console.error('Failed to upload image');
  //       }
  //     } catch (error) {
  //       console.error('Error uploading image:', error);
  //     }
  //   }
  // };
  const handleUpload = async (event: any) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`http://localhost:5001/api/users/${user.intraId}/upload-avatar`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}` 
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setImg(data.avatar_url); // Assuming the server returns the URL of the uploaded image
        } else {
          console.error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handlePreview = async () => {
    try {
      console.log('handlePreview')
      const response = await fetch(`http://localhost:5001/api/users/${user.intraId}/avatar`, {
        method: 'GET',
        headers: {
          Authorization : `Bearer ${token}`
        }
      });
      console.log('image == ', response);
      if (response.ok) {
        const blob = await response.blob();
        console.log('blob == ', blob);
        const imgUrl = URL.createObjectURL(blob);
        setImg(imgUrl);
      } else {
        console.error('Failed to fetch avatar');
      }
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  };

    // useEffect(() => {
    //   // Fetch the initial avatar when the component mounts
    //   if (token) {
    //     handlePreview();
    //   }
    // }, [token]);
  return (
    <>
      <p>UPLOAD AN IMAGE</p>
      <input type="file" onChange={handleUpload} />
      {img && <img src={img} alt="Uploaded Avatar" />}
      <button onClick={() => handlePreview()}>Preview Avatar</button>
    </>
  );
};
