import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import Header from './components/Header';
import styled from 'styled-components'
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import dotenv from 'dotenv';
dotenv.config();

const SwapContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: 100%;
`

const SwapWindow = styled.div`
  margin-top: 50px;
  background-color: black;
  color: white;
  padding: 15px;
  border-radius: 20px;
  box-shadow: 0 0 5px black;
  height: 40vh;
  width: 60vh;
`;

const Swapbox = styled.div`
  overflow: auto;
  margin: 20px 0;
  padding: 20px;
  background-color: #2f2f2f;
  border-radius: 20px;
`

const SwapboxSelect = styled.div`
  width: 50%;
  float: left;
`;

const SwapboxAmount = styled.div`
  width: 50%;
  float: left;
`;

const SwapboxButton = styled.button`
  width: 100%;
`;

function App() {
  const [show, setShow] = useState(false);
  const [tokenList, setTokenList] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { Moralis, enableWeb3, isAuthenticated, isWeb3Enabled, isWeb3EnableLoading } = useMoralis();

  /*const listAvailableTokens = async () => {
    Moralis.initialize(process.env.REACT_APP_APPLICATIONID); // MainNetApplication id from morlis.io
    Moralis.serverURL = process.env.REACT_APP_SERVERURL; // MainNetServer url from moralis.io
    await Moralis.initPlugins();
    await Moralis.Plugins.oneInch.getSupportedTokens({
      chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
    }).then((tokens) => setTokenList(tokens.tokens));
  }*/

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //listAvailableTokens();
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <div className='app'>
      <Header />
      <SwapContainer>
        <SwapWindow>
          <h4>Swap</h4>
          <div id="form">
            <Swapbox>
              <SwapboxSelect onClick={handleShow}> {/*class="swapbox_select token_select" id="from_token_select"*/}
                <img className="token_image" id="from_token_img" />
                <span id="from_token_text"></span>
              </SwapboxSelect>
              <SwapboxAmount> {/*class="swapbox_select"*/}
                <input className="number form-control" placeholder="amount" id="from_amount" />
              </SwapboxAmount>
            </Swapbox>
            <Swapbox>
              <SwapboxSelect onClick={handleShow}> {/*class="swapbox_select token_select" id="to_token_select"*/}
                <img className="token_image" id="to_token_img" />
                <span id="to_token_text"></span>
              </SwapboxSelect>
              <SwapboxAmount> {/*class="swapbox_select"*/}
                <input className="number form-control" placeholder="amount" id="to_amount" />
              </SwapboxAmount>
            </Swapbox>
            <div>Estimated Gas: <span id="gas_estimate"></span></div>
            <SwapboxButton disabled className="btn btn-large btn-primary btn-block" id="swap_button">
              Swap
            </SwapboxButton>
          </div>
        </SwapWindow>
      </SwapContainer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select token</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="token_list">
            {
              tokenList === 'undefined' ?
              <></> :
              tokenList?.map((token, idx) => {
                return (
                  <div key={idx}>
                    <spa>{token.symbol}</spa>
                  </div>
                )
              })
            }
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
