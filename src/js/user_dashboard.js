async function displayUsers() {
    try {

        const userDataString = localStorage.getItem('userData');
        const userData = JSON.parse(userDataString);
        const token = userData.token;
        console.log(token);
        const response = await axios.get('http://localhost:2000/api/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

      const users = response.data;
  
      const userTableBody = document.getElementById('userTableBody');
      userTableBody.innerHTML = ''; // Clear existing data

      users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.first_name}</td>
          <td>${user.last_name}</td>
          <td>${user.email}</td>
          <td>${user.role_type}</td>
          <td>${user.address.substring(0, 20)}</td>
          <td>${user.phone}</td>
          <td>${user.gender}</td>
          <td>${user.dob.substring(0, 10)}</td>
          <!-- Add other table data cells as needed -->
          <td>
           
            <button onclick="goToUpdate(${user.id})">Update</button>
            <button onclick="deleteUser(${user.id})">Delete</button>
          </td>
        `;
        userTableBody.appendChild(row);
      });
       // <button onclick="updateUser(${user.id})">Update</button>
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  
  displayUsers();