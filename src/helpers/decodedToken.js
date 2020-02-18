import jwt from 'jsonwebtoken';

const decodeToken = () => {
    const token = localStorage.getItem('token');

    const decoded = jwt.decode(token.replace('Bearer ', ''));

    return { decoded, token };
};

export default decodeToken;
