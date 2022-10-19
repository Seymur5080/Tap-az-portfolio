import * as yup from 'yup';

let Validation = yup.object().shape({
    name: yup.string().required('Daxil edin!'),
    surname: yup.string().required('Daxil edin!'),
    email: yup.string().email('Düzgün daxil edin').required('Daxil edin!'),
    password: yup.string().min(5, 'Minimum 5 simvol daxil edin').required('Daxil edin!')
});

export default Validation;