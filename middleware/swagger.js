const swaggerUi = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

// Function to load and merge all YAML files dynamically
function loadYamlFiles() {
  const mainSwagger = yaml.load(fs.readFileSync(path.join(__dirname, "../docs/swagger.yaml"), "utf8"));

  const yamlFiles = ["user.yaml", "product.yaml"]; // Add more files here if needed
  yamlFiles.forEach((file) => {
    const filePath = path.join(__dirname, `../docs/${file}`);
    const yamlContent = yaml.load(fs.readFileSync(filePath, "utf8"));
    
    // Merge paths
    mainSwagger.paths = { 
      ...mainSwagger.paths, 
      ...yamlContent.paths 
    };
  });

  return mainSwagger;
}

function swaggerDocs(app) {
  const swaggerDocument = loadYamlFiles();
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log("Swagger Docs available at http://localhost:5000/api-docs");
}

module.exports = swaggerDocs;
