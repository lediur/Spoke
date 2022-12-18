import { Pool } from "pg";

import type { CreateMessageOptions } from "../../../../__test__/testbed-preparation/core";
import {
  createCompleteCampaign,
  createMessage
} from "../../../../__test__/testbed-preparation/core";
import { config } from "../../../config";
import { withClient } from "../../utils";
import type { AssignmentRecord, CampaignContactRecord } from "../types";

describe("auto handling", () => {
  let pool: Pool;
  let contact: CampaignContactRecord;
  let assignment: AssignmentRecord;
  let message: CreateMessageOptions;

  beforeAll(async () => {
    pool = new Pool({ connectionString: config.TEST_DATABASE_URL });
    await withClient(pool, async (client) => {
      ({
        contacts: [contact],
        assignments: [assignment]
      } = await createCompleteCampaign(client, { texters: 1, contacts: 1 }));

      message = {
        campaignContactId: contact.id,
        assignmentId: assignment.id
      };
    });
  });

  afterAll(async () => {
    if (pool) await pool.end();
  });

  test("opts out a contact who says START, then STOP", async () => {
    await withClient(pool, async (client) => {
      await createMessage(client, {
        ...message,
        text: "START"
      });

      await createMessage(client, {
        ...message,
        text: "STOP"
      });
    });
  });
});
