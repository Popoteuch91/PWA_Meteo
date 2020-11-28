import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <div>
      <StyledDiv>
        <StyledH1>Home Page</StyledH1>
        <StyledText>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          doloremque, dolores exercitationem explicabo iste nihil numquam odit
          officia tenetur totam. Animi, eveniet ipsa iure laborum maxime modi
          quam sit sunt. Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Amet architecto cupiditate dolores error et facilis incidunt
          ipsum libero maxime modi molestiae nobis nulla praesentium quo
          repellat, sapiente tempore velit voluptas?Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Distinctio doloribus esse inventore iste
          maxime nihil sunt? Accusantium consequuntur, dolor, exercitationem
          impedit inventore laborum minus modi provident rerum, tempora totam
          voluptatum! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Ducimus ea eligendi enim est eveniet ex, excepturi facere in ipsa,
          laudantium nam officiis perferendis quae quidem quisquam repellendus
          rerum soluta vero? Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Accusantium eum fuga id iste laudantium magnam nostrum obcaecati
          pariatur provident, saepe. Ab, architecto consectetur dicta dolorem
          laborum provident sit vero vitae.
        </StyledText>
      </StyledDiv>
    </div>
  );
};

const StyledDiv = styled.div`
  margin-top: 5%;
  padding: 0.5%;
  padding-left: 1%;
  padding-right: 1%;
  @media (max-width: 1366px) {
    margin-top: 5%;
    padding: 2%;
    padding-left: 2%;
    padding-right: 2%;
  }
  @media (max-width: 1024px) {
    margin-top: 7%;
    padding: 1%;
    padding-left: 2%;
    padding-right: 2%;
  }
  @media (max-width: 768px) {
    margin-top: 10%;
    margin-bottom: 10%;
    padding: 1%;
    padding-left: 3%;
    padding-right: 3%;
  }
  @media (max-width: 375px) {
    margin-top: 20%;
    margin-bottom: 20%;
    padding: 1%;
    padding-left: 5%;
    padding-right: 5%;
  }
`;
const StyledH1 = styled.h1`
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
`;
const StyledText = styled.p`
  font-size: 20px;
  text-align: justify;
`;
export default Home;
