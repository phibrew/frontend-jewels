const Card = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Card Title</h2>
            <p className="text-gray-700 mb-4">This is a simple card component that can be used to display content.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                Action Button
            </button>
        </div>
    )
};

export default Card;