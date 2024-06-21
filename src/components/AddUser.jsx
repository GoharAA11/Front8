import axios from "axios"
import { useForm } from "react-hook-form"
import Types from "prop-types"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const schema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    salary: yup.number().required()
})
export const AddUser = ({ onAdd }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmitHandler = (data) => {
        axios
            .post("http://localhost:3004/users", data)
            .then(res => {
                onAdd(res.data)
                reset();
            })
    };

    return <div>
        <h1>AddUser</h1>
        <form onSubmit={handleSubmit(onSubmitHandler)}>

            <label>name</label>

            <input
                {...register("name")} placeholder="name" required

            />
            <p>{errors.name?.message}</p>

            <label>surname</label>

            <input
                {...register("surname")} placeholder="surname" required

            />
            <p>{errors.surname?.message}</p>

            <label>salary</label>

            <input
                {...register("salary")} placeholder="salary" required
            />
            <p>{errors.salary?.message}</p>

            <button type="submit">save</button>
        </form>
    </div>

    AddUser.propTypes = {
        onAdd: Types.func
    }
}