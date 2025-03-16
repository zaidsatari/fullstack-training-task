import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
    Box, IconButton, Tooltip, Dialog,
    DialogActions, DialogContent, DialogTitle, TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "../atoms/Button";

const API_URL = "https://api.magicthegathering.io/v1/cards";
const STORAGE_KEY = "gridTableData";

const GridTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({
        name: "",
        power: 0,
        type: "",
        rarity: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

                if (storedData.length > 0) {
                    setData(storedData);
                    return;
                }
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Failed to fetch data");

                const result = await response.json();
                setData(result.cards);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(result.cards));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const saveToLocalStorage = (updatedData) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        setData(updatedData);
    };

    const columns = useMemo(() => [
        { accessorKey: "id", header: "ID", enableEditing: false },
        { accessorKey: "name", header: "Card Name" },
        { accessorKey: "power", header: "Power" },
        { accessorKey: "type", header: "Type" },
        { accessorKey: "rarity", header: "Rarity" },
    ], []);

    const handleDelete = (row) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            const updatedData = data.filter((d) => d.id !== row.id);
            saveToLocalStorage(updatedData);
        }
    };

    const handleAddEdit = (record) => {
        setCurrentRecord({
            name: record.name || "",
            power: record.power || 0,
            type: record.type || "",
            rarity: record.rarity || "",
            id: record.id || "",
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentRecord({ name: "", power: 0, type: "", rarity: "" });
    };

    const handleSave = () => {
        const updatedRecord = {
            ...currentRecord,
            power: currentRecord.power || 0,
        };

        let updatedData;
        if (currentRecord.id) {
            updatedData = data.map((d) => (d.id === currentRecord.id ? updatedRecord : d));
        } else {
            const newRecord = { ...updatedRecord, id: String(Date.now()) };
            updatedData = [...data, newRecord];
        }

        saveToLocalStorage(updatedData);
        handleCloseDialog();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <MaterialReactTable
                columns={columns}
                data={data}
                enableEditing
                renderRowActions={({ row }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Tooltip title="Edit">
                            <IconButton onClick={() => handleAddEdit(row.original)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton color="error" onClick={() => handleDelete(row.original)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <Button text="Add Card" onClick={() => handleAddEdit({})} type="primary" />
                )}
            />

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{currentRecord?.id ? "Edit Card" : "Add Card"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Card Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentRecord?.name || ""}
                        onChange={(e) => setCurrentRecord({ ...currentRecord, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Power"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={currentRecord?.power || 0}
                        onChange={(e) => setCurrentRecord({ ...currentRecord, power: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Type"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentRecord?.type || ""}
                        onChange={(e) => setCurrentRecord({ ...currentRecord, type: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Rarity"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentRecord?.rarity || ""}
                        onChange={(e) => setCurrentRecord({ ...currentRecord, rarity: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} type="secondary" text="Cancel" />
                    <Button onClick={handleSave} type="primary" text="Save" />
                </DialogActions>

            </Dialog>
        </>
    );
};

export default GridTable;
