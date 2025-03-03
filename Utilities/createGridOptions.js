export const createGridOptions = (cards) => {
    return {
        columnDefs: [
            { field: "name", headerName: "Card Name" },
            { field: "power", headerName: "Power" },
            { field: "rarity", headerName: "Rarity" },
            { field: "artist", headerName: "Artist" },
            { field: "imageUrl", headerName: "Image", cellRenderer: (params) => `<img src="${params.value}" alt="Card Image" width="50" />` },
        ],defaultColDef: {
            flex:1,
            filter:true,
            floatingFilter:true,
        },

        rowData: cards,
    };
};
