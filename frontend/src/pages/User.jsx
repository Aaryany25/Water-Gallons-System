import React, { useEffect } from 'react'
import useAuthStore from '../store/AuthStore'
import { Card ,CardContent} from '../components/ui/card';

function User() {

  // const user = useAuthStore(
  //   (state) => state.user
  // );

  const getuser = useAuthStore(
    (state) => state.getUser
  );

  // const users = useAuthStore(
  //   (state) => state.users
  // );

  // const loading = useAuthStore(
  //   (state) => state.loading
  // );
console.log(getuser())  

  const error = useAuthStore(
    (state) => state.error
  );

  useEffect(() => {
    getuser();
  }, []);

 
  return (
    <div>

      <h1>All Users Will Appear Here</h1>

      {/* {loading && <p>Loading...</p>} */}

      {/* {error && <p>{error}</p>} */}
      {user && <h1>Welcome {user.name}</h1>}

      {/* {users?.map((u) => (
        <Card className="max-w-4xl mx-auto border-none shadow-lg my-2">
            <CardContent className="p-8 md:p-12 text-center space-y-8">
              <h2 className="text-3xl font-bold">{u.name}</h2>
             <h5>{u.email}</h5>
            </CardContent>
          </Card>
      ))} */}

    </div>
  );
}

export default User;