// src/components/UnauthorizedPage.tsx

import { Link } from "react-router-dom"

type Props = {}

export default function UnauthorizedPage({ }: Props) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold mb-4 text-red-600">Unauthorized Access</h1>
                <p className="mb-6 text-gray-700">You do not have permission to access this page.</p>
                <Link to="/">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                        Go to Home
                    </button>
                </Link>
            </div>
        </div>
    )
}