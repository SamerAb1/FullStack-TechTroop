import { Box, Paper, TextInput } from "@mantine/core";
import "./SearchBox.css";

function SearchBox({
  placeholder,
  searchText,
  onSearchChange,
  results,
  onResultClicked,
}) {
  return (
    <>
      <Box pos="relative">
        <TextInput
          placeholder={placeholder}
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {results && results.length > 0 && (
          <Paper
            pos="absolute"
            withBorder
            shadow="sm"
            w="100%"
            className="results"
          >
            {results.map((result, index) => (
              <Box
                key={index}
                p="xs"
                className="result-item"
                onClick={() => onResultClicked(index)}
              >
                {result}
              </Box>
            ))}
          </Paper>
        )}
      </Box>
    </>
  );
}

export default SearchBox;
