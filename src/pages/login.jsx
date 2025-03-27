import { useState } from "react";
import { useSignIn } from "../hooks/useLogin";
import { Input, Button, Modal, Typography } from "antd";
import bizznezzman from '../assets/151595661_d7fe0908-4a18-445f-940f-f15055e16c75-01.jpg'
import  logo from '../assets/naflogo-01.svg'
const { Text, Link } = Typography;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, error, isPending } = useSignIn();
  const [showPass, setShowPass] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("datasent", email, password);
    const result = await signIn(email, password);

    if (result.error === "Your account is awaiting approval") {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6 px-4">
        <div className="flex justify-center md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto bg-white">
           <div className="flex justify-center flex-col items-center">
<img src={logo} className="h-20" alt="" srcset="" />
<div className="mb-8">
                <h3 className="text-primary-light text-2xl font-bold">Login to your account  </h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">Sign in to your account and explore a world of possibilities. Your journey begins here.</p>
              </div>

           </div>
            <form onSubmit={handleLogin} className="space-y-4">
             
              <div>
                <label className="text-gray-800 text-sm mb-2 block">User name</label>
                <Input
                  name="username"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-green-600"
                  placeholder="Enter user name"
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <Input.Password
                    name="password"
                    type={showPass ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-green-600"
                    placeholder="Enter password"
                    iconRender={(visible) => (
                      <svg
                        onClick={() => setShowPass((prev) => !prev)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                        viewBox="0 0 128 128"
                      >
                        <path
                          d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      ></path>
                      </svg>
                    )}
                  />
                </div>
              </div>

              <div className="text-sm">
                <Link href="javascript:void(0);" className="text-secondary-light hover:underline font-semibold">
                  Forgot your password?
                </Link>
              </div>

              <div className="!mt-8">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg"
                  loading={isPending}
                >
                  {isPending ? "Logging in" : "Login"}
                </Button>
              </div>

              <Text className="text-sm !mt-8 text-center text-gray-500">
                Don't have an account{" "}
                <Link href="javascript:void(0);" className="text-green-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                  Register here
                </Link>
              </Text>
              {error && <Text type="danger">{error}</Text>}
            </form>
          </div>
          {/* <div className="max-md:mt-8">
            <img src={bizznezzman} className="w-full h-full max-md:w-4/5 mx-auto block object-cover" alt="Dining Experience" />
          </div> */}
        </div>
      </div>

      {showModal && (
        <Modal
          title="Your account is under review"
          visible={showModal}
          onCancel={() => setShowModal(false)}
          footer={[
            <Button key="ok" type="primary" onClick={() => setShowModal(false)}>
              OK
            </Button>,
          ]}
        >
          <p>Your mentor account is awaiting approval. Please wait for confirmation.</p>
        </Modal>
      )}
    </>
  );
};

export default Login;
