import useAuthStore from "../store/AuthStore";

export default function Dashboard(){
    const { user } = useAuthStore(); 

    return (
    <div className="min-h-screen bg-[#fdfcfa] px-4 pt-20">
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>

        {user ? (
            <div className="text-center">
            <p className="mb-2"><strong>Name:</strong> {user.name}</p>
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            {user.googleId && (
                <p className="mb-2"><strong>Google ID:</strong> {user.googleId}</p>
            )}
            <p className="text-green-600 font-semibold mt-4">You are logged in successfully 🎉</p>
            </div>
        ) : (
            <p className="text-red-500 text-center">User not found.</p>
        )}
        </div>
    </div>
    );
}
