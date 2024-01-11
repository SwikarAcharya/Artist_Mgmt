let currentPage = 1;
const itemsPerPage = 10;

async function displayUsers(page) {
    try {

        const userDataString = localStorage.getItem('userData');
        const userData = JSON.parse(userDataString);
        const token = userData.token;
        console.log(token);

        const offset = (page - 1) * itemsPerPage;

        const response = await axios.get(`http://localhost:2000/api/users?offset=${offset}&limit=${itemsPerPage}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

      const users = response.data;
      if (users.length === 0) {
        if(currentPage > 1) {
          alert('No more users to display');
          currentPage--;
          displayUsers(currentPage);
        }
        if(currentPage === 1) {
          alert('No users to display');
        }
        return;
      }
  
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
  
  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
      displayUsers(currentPage);
    }
  }
  
  function nextPage() {
    currentPage++;
    displayUsers(currentPage);
  }
  
  document.getElementById('prev').addEventListener('click', prevPage);
  document.getElementById('next').addEventListener('click', nextPage);
  


  displayUsers(currentPage);