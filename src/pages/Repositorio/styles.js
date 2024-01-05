import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Loading = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Container = styled.div`
  width: 40vw;
  height: 80vh;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 20%;
    margin-bottom: 20px;
  }

  h1 {
    font-size: 24px;
    color: #0D2636;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #000;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }  
`;

export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;

export const IssuesList = styled.ul`
  padding-top: 20px;
  border-top: 1px solid #eee;
  list-style: none;
  flex-grow: 1;
  overflow-y: scroll;

  li {
    display: flex;
    padding: 15px 10px;

    & + li {
      margin-top: 12px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #0D2636;
    }

    .content {
      display: flex;
      flex-direction: column;
      margin-left: 12px;

      p {
        margin-top: 10px;
        font-size: 12px;
        color: #000;
      }
    }

    strong {
      font-size: 15px;

      a {
        text-decoration: none;
        color: #222;
        transform: 0.3s;

        &:hover {
          color: #0071db;
        }
      }
    }

    .markers {
      display: flex;
      flex-direction: row;
      margin-top: 12px;
      flex-wrap: nowrap;
      flex-shrink: 0;

      span {
        background: #222;
        color: #FFF;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        padding: 5px 7px;
        white-space: nowrap;

        & + span {
          margin-left: 10px;
        }
      }
    }
  }
`;

export const PageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  background-color: white;

  button {
    outline: 0;
    border: 0;
    background: none;
    padding: 5px 10px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

export const FilterList = styled.div`
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    outline: 0;
    border: 0;
    padding: 8px;
    border-radius: 4px;
    margin: 0 3px;

    &:nth-child(${props => props.active + 1}) {
      background: #0071db;
      color:#FFF;
    }
  }
`;