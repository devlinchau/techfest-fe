import axios from 'axios';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/register/', { username, email, password1, password2 });
      console.log('Register response:', response.status, response.data.response);
      if(response.status === 200) {
        //TODO: Redirect to chatbot page
      }
    } catch (error) {
      console.error('Error registering:', error);
    } finally {
    }
  };

  return (
    <div className="flex flex-col h-screen w-2/3 md:w-1/2 lg:w-1/3 mx-auto">
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="mb-4 py-2">
          <span className="font-semibold text-slate-700 text-2xl">Register</span>
        </div>
        <div className="flex flex-col space-y-4 mb-6">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
          <Button
            type="submit"
            className='w-1/4 bg-slate-700 hover:bg-slate-600'
            onClick={handleRegister}
          >
            Submit
          </Button>
      </div>
    </div>
  )
}