const { BlobServiceClient } = require("@azure/storage-blob");

const fs = require("fs");
const path = require("path");

const connectionString =
  "DefaultEndpointsProtocol=https;AccountName=aersaleathena;AccountKey=ki+0uama6houqsxzSwnxPxEDlMtlZLL8aKZhAEzZOAT6Ypo7k3ZGecEHoba8ZPx8zf2Mpu+H2rpl+ASteYWr/g==;EndpointSuffix=core.windows.net";

const containerName = "aersaleathena";

async function uploadFileToBlobStorage(blobNameString, filePathString) {
  //   const localFilePath = `../../uploadFiles`;

  const blobName = "blobNameString";

  const filePath = "filePathString";

  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);

  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blobClient = containerClient.getBlockBlobClient(blobName);

  const stream = fs.createReadStream(filePath);

  const uploadOptions = {
    bufferSize: 4 * 1024 * 1024, // 4 MB

    maxBuffers: 20, // 80 MB in total
  };

  await blobClient.uploadStream(
    stream,
    uploadOptions.bufferSize,
    uploadOptions.maxBuffers
  );

  console.log(
    `File "${filePath}" has been uploaded to "${containerName}" container as "${blobName}" blob.`
  );
}

const uploadFileToBlobStorage_TEST = async (pdfArray) => {
  // Is this for client?
  // const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sas}`);
  //   const containerClient = blobServiceClient.getContainerClient(containerName)
  // const containers = blobServiceClient.listContainers();
  // console.log("containers: ", containers);
  //   function savePDFArrayToAPUS(pdfFiles) {
  //     const destinationFolder = "APUS";
  //     if (!fs.existsSync(destinationFolder)) {
  //       fs.mkdirSync(destinationFolder);
  //     }
  //     pdfFiles.forEach((pdfFile) => {
  //       const destinationPath = path.join(
  //         destinationFolder,
  //         path.basename(pdfFile)
  //       );
  //       fs.copyFile(pdfFile, destinationPath, (error) => {
  //         if (error) {
  //           console.error(
  //             `An error occurred while saving ${pdfFile} to APUS folder:`,
  //             error
  //           );
  //         } else {
  //           console.log(`${pdfFile} saved to APUS folder.`);
  //         }
  //       });
  //     });
  //   }
  //   savePDFArrayToAPUS(pdfArray);
};

// uploadFileToBlobStorage().catch((err) => {
//   console.error("Error occurred:", err);
// });

module.exports = { uploadFileToBlobStorage, uploadFileToBlobStorage_TEST };
