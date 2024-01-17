import axios from 'axios';

const ShowSchools = ({schools }) => {
  return (
    <div>
      {schools.map((school) => (
        <div key={school.id}>
          <p>{school.name}</p>
          <p>{school.address}, {school.city}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowSchools;

export async function getServerSideProps() {
  try {
    // Fetch schools data from the MySQL database
    const response = await axios.get('/api/getSchools');
    const schools = response.data;
    return { props: { schools } };
  } catch (error) {
    console.error('Error fetching schools:', error);
    return { props: { schools: [] } };
  }
}
