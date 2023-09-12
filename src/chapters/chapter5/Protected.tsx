import Container from './Container'
import withProtectedRoute from './ProtectedRoute';

function Protected() {
    return (
    <Container>
        <h1>Protected route</h1>
    </Container>
    );
}

export default withProtectedRoute(Protected);