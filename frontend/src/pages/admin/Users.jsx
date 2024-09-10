import { useEffect, useState } from "react"
import Layout from "./layout/Layout"
import api from '../../api/api.js';
import { format } from 'date-fns';

const Users = () => {
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
      
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users' , {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setUsers(response.data.users);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching users:", err);
                setError(err);
                setLoading(false); 
            }
          };
      
          fetchUsers();
    }, [])
    

    return (
        <Layout>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Updated At
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((item, index) => (
                                <tr key={index} className="bg-white border-b text-black">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        {item._id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {format(new Date(item.createdAt), 'PPP p')}
                                    </td>
                                    <td className="px-6 py-4">
                                        {format(new Date(item.updatedAt), 'PPP p')}
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Users