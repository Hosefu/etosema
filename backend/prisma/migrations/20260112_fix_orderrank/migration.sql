-- Fix orderRank for existing case blocks to use padded format
-- This ensures proper lexicographic sorting (so "10" comes after "9", not after "1")

-- Update case_blocks orderRank to padded format
-- We'll order by id to preserve insertion order as a proxy for intended order
DO $$
DECLARE
  block_rec RECORD;
  counter INT := 1;
BEGIN
  FOR block_rec IN 
    SELECT id, "caseId"
    FROM case_blocks
    ORDER BY "caseId", id
  LOOP
    UPDATE case_blocks
    SET "orderRank" = LPAD(counter::TEXT, 10, '0')
    WHERE id = block_rec.id;
    
    counter := counter + 1;
    
    -- Reset counter for each new case
    IF NOT EXISTS (
      SELECT 1 FROM case_blocks 
      WHERE "caseId" = block_rec."caseId" 
      AND id > block_rec.id
    ) THEN
      counter := 1;
    END IF;
  END LOOP;
END $$;
