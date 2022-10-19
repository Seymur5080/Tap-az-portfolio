import * as yup from 'yup';

let Validation = yup.object().shape({
    email: yup.string().email().required('Daxil Edin!'),
    password: yup.string().min(5, 'Minimum 5 simvol daxil edin!').required('Daxil edin!'),
});

export default Validation;