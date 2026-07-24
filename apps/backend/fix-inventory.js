require('dotenv').config();
const { Client } = require('pg');

const client = new Client({ connectionString: process.env.DATABASE_URL + '?sslmode=require' });

async function fixInventory() {
  await client.connect();
  
  const locationId = 'sloc_01KXDP5419NZ6MS2P6Y3KH5GP2'; // main warehouse
  
  const res = await client.query(`
    INSERT INTO inventory_level (
      id, inventory_item_id, location_id, stocked_quantity, reserved_quantity, incoming_quantity
    )
    SELECT 
      'ilev_' || md5(random()::text),
      vii.inventory_item_id,
      $1,
      100,
      0,
      0
    FROM product_variant_inventory_item vii
    LEFT JOIN inventory_level il ON vii.inventory_item_id = il.inventory_item_id
    WHERE il.id IS NULL
  `, [locationId]);
  
  console.log(`Inserted ${res.rowCount} inventory levels!`);
  await client.end();
}

fixInventory().catch(console.error);
