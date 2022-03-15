import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { useMoralis } from "react-moralis";

function Header() {
    const { authenticate, isAuthenticated, isAuthenticating, user, logout } = useMoralis();

    const logIn = async () => {
        if (!isAuthenticated) {

            await authenticate({ signingMessage: "Log in using Moralis" })
                .then(function (user) {
                    console.log("logged in user:", user);
                    console.log(user.get("ethAddress"));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const logOut = async () => {
        await logout();
        console.log("logged out");
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">DEX Sample</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Home</Nav.Link>
                    </Nav>
                    {
                        !isAuthenticated ?
                        <Nav></Nav> :
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >Wallet Address : {user.get("ethAddress").slice(0,5)+'...'+user.get("ethAddress").slice(user.get("ethAddress").length-3,user.get("ethAddress").length)}</Nav>
                    }
                    {
                        !isAuthenticated ?
                        <Button variant="outline-success" onClick={logIn}>Connect Wallet</Button> :
                        <Button variant="outline-success" onClick={logOut} disabled={isAuthenticating}>Disconnect Wallet</Button>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;