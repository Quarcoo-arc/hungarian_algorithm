import styled from "styled-components";

const Title = styled.h1`
  margin: 1rem auto 3rem;
  text-align: center;
`;

const Form = styled.form`
  margin: 1rem auto 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem 2rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  span {
    display: flex;
    flex-direction: row;
    gap: 1.5rem 2rem;
  }

  span span {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    @media screen and (max-width: 425px) {
      flex-direction: column;
    }
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  padding: 0.4rem;
  text-align: center;
  ${(props) =>
    props.short
      ? {
          width: "2rem",
        }
      : {
          width: "7rem",
        }}
`;

const Heading = styled.h3`
  text-align: center;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  span {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 4rem 0 3rem;
  align-items: center;
`;

export {
  Title,
  Form,
  InputField,
  InputWrapper,
  Heading,
  ResultContainer,
  SectionWrapper,
};
