import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  Heading,
  VStack,
} from '@chakra-ui/react';

function App() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/stats')
      .then((response) => setStats(response.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <Box bg="gray.900" color="white" minH="100vh" p={6}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl">
          System Vitals
        </Heading>

        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {!stats && !error && <Spinner size="xl" />}

        {stats && (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
            <Stat bg="gray.700" p={5} borderRadius="lg">
              <StatLabel>CPU Usage</StatLabel>
              <StatNumber>{stats.cpu}%</StatNumber>
            </Stat>

            <Stat bg="gray.700" p={5} borderRadius="lg">
              <StatLabel>Memory Usage</StatLabel>
              <StatNumber>{stats.memory}%</StatNumber>
            </Stat>

            <Stat bg="gray.700" p={5} borderRadius="lg">
              <StatLabel>Disk Usage</StatLabel>
              <StatNumber>{stats.disk}%</StatNumber>
            </Stat>

            <Stat bg="gray.700" p={5} borderRadius="lg">
              <StatLabel>Processes</StatLabel>
              <StatNumber>{stats.process_count}</StatNumber>
            </Stat>

            <Stat bg="gray.700" p={5} borderRadius="lg">
              <StatLabel>Network Sent</StatLabel>
              <StatNumber>{stats.network.bytes_sent} bytes</StatNumber>
            </Stat>

            <Stat bg="gray.700" p={5} borderRadius="lg">
              <StatLabel>Network Received</StatLabel>
              <StatNumber>{stats.network.bytes_recv} bytes</StatNumber>
            </Stat>
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  );
}

export default App;