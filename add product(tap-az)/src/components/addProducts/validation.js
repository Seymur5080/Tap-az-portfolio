import * as yup from 'yup';

let Validation = yup.object().shape({
    title: yup.string().required('Daxil edin!'),
    context: yup.string().required('Daxil edin!'),
    price: yup.number().required('Daxil edin!')
});

export default Validation;