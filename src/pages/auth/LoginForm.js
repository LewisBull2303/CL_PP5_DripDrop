import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";

