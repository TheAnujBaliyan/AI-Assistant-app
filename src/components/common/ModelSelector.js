// src/components/common/ModelSelector.js
import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

const models = [
  { id: 'llama', name: 'Llama' },
  { id: 'deepseek', name: 'Deepseek' },
  { id: 'codestral', name: 'Codestral' },
  { id: 'mistralai', name: 'MistralAI' },
];

function ModelSelector({ value, onChange, helperText }) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="model-selector-label">Model</InputLabel>
      <Select
        labelId="model-selector-label"
        id="model-selector"
        value={value}
        label="Model"
        onChange={onChange}
      >
        {models.map((model) => (
          <MenuItem key={model.id} value={model.id}>
            {model.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default ModelSelector;
