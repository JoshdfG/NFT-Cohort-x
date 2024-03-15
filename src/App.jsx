import { Box, Button, Container, Flex, Text } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import AppTabs from "./component/AppTabs";
import useCollections from "./hooks/useCollections";
import useMyNfts from "./hooks/useMyNfts";
import { useState } from "react"; // Import useState hook for managing modal state

configureWeb3Modal();

function App() {
  const tokensData = useCollections();
  const myTokenIds = useMyNfts();
  const [transferModalOpen, setTransferModalOpen] = useState(false); // State for transfer modal
  const [mintOpen, setMintOpen] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState(null); // State for selected token ID to transfer

  const myTokensData = tokensData.filter((x, index) =>
    myTokenIds.includes(index)
  );

  console.log("Tokens Data:", tokensData);

  // Function to handle transfer button click
  const handleTransferClick = (tokenId) => {
    setSelectedTokenId(tokenId);
    setTransferModalOpen(true);
  };

  const handleMintClick = (tokenId) => {
    setSelectedTokenId(tokenId);
    setMintOpen(true);
  };

  const handleConfirmTransfer = () => {
    // Define your logic for confirming the transfer
    console.log("Transfer confirmed");
  };

  const handleConfirmTransfer2 = () => {
    // Define your logic for confirming the transfer
    console.log("Transfer confirmed");
  };
  return (
    <Container>
      <Header />
      <main className="mt-6">
        <AppTabs
          MyNfts={
            <Flex align="center" gap="8" wrap={"wrap"}>
              {myTokensData.length === 0 ? (
                <Text>No NFT owned yet</Text>
              ) : (
                myTokensData.map((x) => (
                  <Box key={x.dna} className="w-[20rem]">
                    <img
                      src={x.image}
                      className="w-full object-contain"
                      alt={x.name}
                    />
                    <Text className="block text-2xl">Name: {x.name}</Text>
                    <Text className="block">Description: {x.description}</Text>
                    <Button
                      as="a" // Use anchor tag for linking to OpenSea
                      href={x.openseaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-2 text-xl mt-2"
                    >
                      View on OpenSea
                    </Button>
                    <Button
                      onClick={() => handleTransferClick(x.id)} // Pass token ID to handleTransferClick
                      className="px-8 py-2 text-xl mt-2"
                    >
                      Transfer
                    </Button>
                  </Box>
                ))
              )}
            </Flex>
          }
          AllCollections={
            <Flex align="center" gap="8" wrap={"wrap"}>
              {tokensData.length === 0 ? (
                <Text>Loading...</Text>
              ) : (
                tokensData.map((x) => (
                  <Box key={x.dna} className="w-[20rem]">
                    <img
                      src={x.image}
                      className="w-full object-contain"
                      alt={x.name}
                    />
                    <Text className="block text-2xl">Name: {x.name}</Text>
                    <Text className="block">Description: {x.description}</Text>
                    <Button
                      className="px-8 py-2 text-xl mt-2"
                      onClick={() => handleMintClick(x.id)}
                    >
                      Mint
                    </Button>
                  </Box>
                ))
              )}
            </Flex>
          }
        />
      </main>
      {/* Transfer Modal */}
      {transferModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Transfer Token</h2>
            <p className="mb-4">Transfer token {selectedTokenId} to:</p>
            {/* Add input field and confirm/ cancel buttons */}
            <div className="flex justify-between">
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-1 w-1/2"
                onChange={(e) => setTransferRecipient(e.target.value)}
              />
              <div>
                <Button onClick={handleConfirmTransfer} className="mr-2">
                  Confirm
                </Button>
                <Button onClick={() => setTransferModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mintOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Mint NFT</h2>
            <p className="mb-4">Mint NFT {selectedTokenId} to:</p>
            {/* Add input field and confirm/ cancel buttons */}
            <div className="flex justify-between">
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-1 w-1/2"
                onChange={(e) => setTransferRecipient(e.target.value)}
              />
              <div>
                <Button onClick={handleConfirmTransfer2} className="mr-2">
                  Confirm
                </Button>
                <Button onClick={() => setMintOpen(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default App;
