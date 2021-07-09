import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { MdWarning } from "react-icons/md"

const NotFound = () => <>
    <Container className="mt-5">
        <Row>
            <Col>
                <Alert variant="danger">
                    <div class="d-flex flex-row">
                        <div className="mr-2">
                            <MdWarning size="3em" />
                        </div>
                        <div>
                            <h1>404 - Page Not Found</h1>
                        </div>
                    </div>
                </Alert>
            </Col>
        </Row>
    </Container>
</>;

export default NotFound;
