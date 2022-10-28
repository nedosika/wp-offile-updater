import {useQuery, gql} from '@apollo/client';

const GET_TASKS = gql`query {
  tasks{
    name
  }
}`;

function App() {
    const {loading, error, data} = useQuery(GET_TASKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error.message}</p>;

    console.log(data)

    return (
        <div>
            Hello
        </div>
    );
}

export default App;
