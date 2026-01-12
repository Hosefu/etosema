-- Fix orderRank for existing blocks to use zero-padded strings for proper lexicographic sorting
-- This prevents "10" from sorting before "2" when using string-based orderBy

-- Update case_blocks orderRank: pad with zeros to 10 digits
UPDATE case_blocks
SET "orderRank" = LPAD(REGEXP_REPLACE("orderRank", '[^0-9]', '', 'g'), 10, '0')
WHERE "orderRank" ~ '^[a-z]?[0-9]+$';

-- Update cases orderRank: pad with zeros to 10 digits  
UPDATE cases
SET "orderRank" = LPAD(REGEXP_REPLACE("orderRank", '[^0-9]', '', 'g'), 10, '0')
WHERE "orderRank" ~ '^[a-z]?[0-9]+$';
