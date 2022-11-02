import {gql} from "@apollo/client";

export const REFRESH_TOKEN = gql`
    query refreshToken {
        refreshToken{
            tokens {
                accessToken
                refreshToken
            }
        } 
    }
`

export const GET_TASKS = gql`
    query {
        tasks{
            id
            name
            status {
                start
            }
        }
    }
`;