// ------------ import external depenencies ------------
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ----------- import internal dependencies -----------
import Seo from "../shared/Seo";
import Input from "../components/Input";
import ModalWrapper from "../components/Modal";
import { criterias } from "../utils/helpers";
import useSettings from "../hooks/useSettings";
import {
  validateMethods,
  criteriasObj,
  hardPasswordStrength,
  mediumPasswordStrength,
} from "../utils/helpers";

function Login() {
  type Inputs = {
    email: string;
    password: string;
  };

  const schema = yup.object({
    email: yup
      .string()
      .required("Please your Email is required")
      .email("Please  input a valid email")
      .matches(/@[^.]*\./, "Please input a valid email"),
    password: yup.string().required("The Password field is required"),
  });

  // ----- intialize custpm hooks ------
  const { userSetting, criteriaObjects, updatecriteria } = useSettings();
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver<any>(schema),
  });

  const passwordValue = watch("password");

  // ------ component state managers ------
  const [isOpen, setIsOpen] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const closeModal = () => setIsOpen(false);

  /**
   * Validate user password onBlur
   */
  const validatePassword = useCallback(() => {
    const passwordParam = Object.keys(userSetting);

    if (!passwordValue) {
      setPasswordStrength("");
      return;
    }

    for (const method of passwordParam) {
      if (validateMethods[method](passwordValue)) {
        clearErrors();
        continue;
      } else {
        setError("password", { message: "Password does not meet criteria" });
        break;
      }
    }

    switch (true) {
      case hardPasswordStrength(passwordValue):
        setPasswordStrength("Hard");
        break;

      case mediumPasswordStrength(passwordValue):
        setPasswordStrength("Medium");
        break;

      default:
        setPasswordStrength("Easy");
    }
  }, [passwordValue]);

  useEffect(() => {
    /**
     * Check for user setting state
     */
    if (userSetting === null) {
      setIsOpen(true);
    }
  }, []);

  return (
    <Seo allowSkip section="main" content="Skip To Content">
      <MainWrapper id="main">
        <Container>
          <div className="py-5 px-8">
            <button onClick={() => setIsOpen(true)}>
              <img src="./asset/setting.svg" alt="User settings" />
              <span>User settings</span>
            </button>
            <article>
              <span className="block font-medium text-2xl heading">
                Please Login
              </span>
              <span className="block pt-2 desc">
                This is the begining of nothing all you find is nothing but
                awesomeness
              </span>
            </article>

            {/* ----- input section ------- */}
            <form className="mt-5 w-full" onSubmit={handleSubmit(() => {})}>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      isError={errors?.email !== undefined}
                      error={errors.email}
                      placeholder="Email"
                      {...field}
                      className="mt-2"
                      disabled={userSetting === null}
                    />
                  )}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="password"
                      placeholder="Password"
                      isError={errors?.password !== undefined}
                      error={errors.password}
                      {...field}
                      onBlur={validatePassword}
                      className="mt-2"
                      disabled={userSetting === null}
                    />
                  )}
                />
                {passwordStrength ? (
                  <span className="block text-blue">
                    Password Strength: {passwordStrength}
                  </span>
                ) : null}

                {userSetting ? (
                  <ul className="pl-2">
                    {Object.keys(userSetting).map((val, key) => (
                      <li key={key} className=" text-sm">
                        {criteriasObj[val].desc}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <Btn
                className="mt-6"
                disabled={
                  userSetting === null || Object.keys(errors).length > 0
                }
              >
                Submit
              </Btn>
            </form>
          </div>
          <div>
            <img src="./asset/food.jpg" alt="Food (Pancake and honey)" />
          </div>

          {/* ------- modal section ------- */}
          <ModalWrapper isOpen={isOpen} onClose={closeModal}>
            <ModalContent>
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <span className="block text-lg font-medium">
                Setup Password Criteria
              </span>

              {/* ------ criteria checked boxes ----- */}
              {criterias.map((obj, ind) => (
                <OptionWrapper key={ind}>
                  <input
                    type="checkbox"
                    name={obj.name}
                    id={obj.name}
                    onChange={updatecriteria}
                    checked={criteriaObjects?.[obj.name]}
                  />
                  <label htmlFor={obj.name}>{obj.desc}</label>
                </OptionWrapper>
              ))}
            </ModalContent>
          </ModalWrapper>
        </Container>
      </MainWrapper>
    </Seo>
  );
}

export default Login;

// ------- component styles ------
const MainWrapper = styled.main`
  height: 100vh;
  background-image: var(--foreground);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.section`
  background: var(--white);
  height: 90%;
  width: 80%;
  border-radius: 8px;
  display: flex;
  padding: 1rem;

  & > div:first-child {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    overflow-y: auto;

    & > article > .heading {
      animation: fadeInScale 0.5s ease both;
    }

    & > article > .desc {
      animation: fadeInScale 0.5s ease 0.2s both;
    }

    & > button {
      position: absolute;
      top: 0;
      left: 20px;
      cursor: pointer;
      border: none;
      background: transparent;
      display: flex;
      align-items: center;
      gap: 0.25rem;

      & > img {
        height: 35px;
      }
    }
  }

  & > div:nth-child(2) {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > img {
      height: 95%;
      display: block;
      width: 100%;
      border-radius: 8px;
      object-fit: cover;
    }
  }
`;

const Btn = styled.button`
  height: 50px;
  width: 100%;
  display: block;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--white);
  background: var(--deepBlue);
  display: block;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
`;

const ModalContent = styled.div`
  min-height: 350px;
  background: var(--white);
  width: 400px;
  max-width: 500px;
  border-radius: 8px;
  padding: 1rem;

  & > .close {
    display: block;
    margin-left: auto;
    font-size: 2.5rem;
    color: var(--deepBlue);
    width: fit-content;
    cursor: pointer;
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.8rem;
  align-items: center;

  & > input {
    height: 20px;
    width: 20px;
    // accent-color: var(--blue);
  }
`;
