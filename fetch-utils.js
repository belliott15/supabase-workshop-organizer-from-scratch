const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwd2Z1YXF2d2x6cnRwYXV1Z290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5Njg3MTAsImV4cCI6MTk2MzU0NDcxMH0.sUI1TaJk5GE34Q06B2tduC38-RG8NO-HoqJhGa4wrhg';

const SUPABASE_URL = 'https://cpwfuaqvwlzrtpauugot.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getWorkshop(){
    // console.log(client);
    const response = await client
        .from('workshops')
        .select('*, workshop_members(*)');
    return response.body;
}

export async function getMember(id){
    const response = await client   
        .from('workshop_members')
        .select('*')
        .match({ id })
        .single();

    return response.body;
}

export async function createMember(member){
    const response = await client
        .from('workshop_members')
        .insert({
            first_name: member.first_name, 
            last_name: member.last_name,
            workshop_id: member.workshop_id
        });

    return response.body;
}


export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./workshops');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
