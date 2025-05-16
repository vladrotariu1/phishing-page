import {useEffect} from "react";
import emailjs from '@emailjs/browser'
import Form from "./components/Form.tsx";
import {createBrowserRouter, RouterProvider} from "react-router";
import RedeemPrize from "./components/RedeemPrize.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Form />
    },
    {
        path: '/redeem-prize',
        element: <RedeemPrize />
    }
])

function App() {
  useEffect(() => {
      emailjs.init({
          publicKey: '-wPc723Bn_jfBNm29'
      })
      console.log(window.location.origin);
  }, []);

  return (
      <div className="max-w-sm mx-auto">
          <RouterProvider router={router} />
      </div>
  )
}

export default App
